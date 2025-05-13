require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

// Store templates in memory (in production, use a database)
const templates = new Map();

// Upload template endpoint
app.post('/api/upload-template', upload.single('template'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();
    let templateContent = '';

    // Parse template based on file type
    if (fileType === '.docx') {
      const buffer = fs.readFileSync(filePath);
      const doc = new Document(buffer);
      templateContent = doc.getText();
    } else if (fileType === '.pdf') {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      templateContent = data.text;
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // Store template with a unique ID
    const templateId = Date.now().toString();
    templates.set(templateId, {
      content: templateContent,
      fileType,
      originalName: req.file.originalname
    });

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({ templateId });
  } catch (error) {
    console.error('Template upload error:', error);
    res.status(500).json({ error: 'Failed to process template' });
  }
});

// Generate report endpoint
app.post('/api/generate-report', async (req, res) => {
  try {
    const { templateId, data } = req.body;

    if (!templateId || !data) {
      return res.status(400).json({ error: 'Missing templateId or data' });
    }

    const template = templates.get(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Use OpenAI to analyze template and data
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing document templates and generating content that matches the style and format."
        },
        {
          role: "user",
          content: `Template content: ${template.content}\n\nData to incorporate: ${data}\n\nGenerate content that matches the template's style and incorporates the provided data.`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const generatedContent = completion.choices[0].message.content;

    // Create new document with generated content
    let outputBuffer;
    if (template.fileType === '.docx') {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(generatedContent)
              ],
            }),
          ],
        }],
      });

      outputBuffer = await Packer.toBuffer(doc);
    } else {
      // For PDF, we'll need to use a PDF generation library
      // This is a placeholder - you'll need to implement PDF generation
      outputBuffer = Buffer.from(generatedContent);
    }

    // Send the generated document
    res.setHeader('Content-Type', template.fileType === '.docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=generated_report${template.fileType}`);
    res.send(outputBuffer);

  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 