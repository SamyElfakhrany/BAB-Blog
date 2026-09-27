---
name: book-detailed-summary
description: Creates comprehensive, section-by-section summaries from user-provided PDF, Markdown, or MDX books, including source-page references, images extracted from the book, source-grounded generated visuals, and exercises found in the book. Use when the user asks to summarize a book or turn a supplied book into structured study material without introducing outside information.
---

# Book Detailed Summary

Create a faithful, detailed summary using only the supplied book. Every factual statement, interpretation, image, and exercise must be traceable to the source.

## Non-negotiable source rule

- Use only the supplied PDF, Markdown, or MDX files and their included assets.
- Do not add outside facts, examples, explanations, opinions, recommendations, or exercises.
- Do not use web search or external reference material unless the user explicitly changes this rule.
- Do not fill gaps from memory or general knowledge.
- When the source is unclear, incomplete, contradictory, or unreadable, say so and identify the relevant page or section.
- Distinguish the author's claims from examples, quoted viewpoints, and the summarizer's organization.
- Never present an inference as a fact. Avoid inferences unless needed to connect explicitly stated ideas; label each necessary inference as `Source-grounded inference` and cite its basis.

## Workflow

### 1. Inspect the source

1. Identify the title, author, edition, language, file type, and available page or section markers.
2. Build a complete outline of parts, chapters, and sections before drafting.
3. Confirm that the full source is readable. For a scanned PDF, use OCR and flag uncertain text instead of guessing.
4. Record the book's own images, figures, tables, diagrams, captions, examples, and exercises with their page or section locations.
5. If multiple files are supplied, determine their order from their metadata or internal structure. Do not invent an order.

### 2. Create a source map

Maintain working notes that map each planned summary section to:

- source chapter and heading;
- PDF page number and printed page number when they differ, or the Markdown heading anchor;
- source images and captions;
- exercises and any answer key supplied by the book;
- passages that are unclear or could not be extracted reliably.

Use this map to check every section before delivery.

### 3. Write the summary

- Follow the book's original order and hierarchy.
- Divide the output into parts, chapters, and meaningful subsections.
- Explain each major idea in enough detail to preserve the author's reasoning, definitions, processes, distinctions, examples, and conclusions.
- Preserve important terminology. Define a term only as the book defines it.
- Condense repetition, but do not omit unique arguments, qualifications, warnings, exceptions, or limitations.
- Attribute opinions and claims to the author when the book presents them as such.
- Paraphrase by default. Use short quotations only when exact wording is necessary, and include a source location.
- Add a source reference to every substantive paragraph or tightly related group of bullets.
- If the source does not contain material for a template subsection, omit that subsection rather than inventing content.

### 4. Handle images

#### Images from the book

- Extract or reuse relevant images at the highest practical quality.
- Preserve the original image without altering its factual content.
- Keep the original caption when available and cite its page or section.
- If no caption exists, use a neutral label such as `Figure from the book`; do not guess what it depicts.
- Place the image near the summary passage it supports.
- Do not include decorative images that add no source information.

#### Generated images

- Generate an image only when it helps explain information explicitly present in the book.
- Base its content solely on cited passages, tables, diagrams, or relationships from the source.
- Do not introduce new entities, facts, labels, examples, symbols, settings, or causal relationships.
- Prefer diagrams, process flows, comparison layouts, and concept maps over imaginative scenes.
- Label every generated asset: `AI-generated explanatory visual based solely on [chapter/section, page(s)]`.
- Include a brief generation brief listing the exact source statements represented by the image.
- If the source does not provide enough visual detail, do not generate the image. State that the source is insufficient.

### 5. Include exercises from the book

- Include only exercises, review questions, activities, case prompts, or practice tasks actually present in the supplied source.
- Preserve their numbering, order, intent, and cited location.
- Clearly mark whether wording is `verbatim` or `faithfully condensed`.
- Do not create extra exercises or change their difficulty.
- Include answers or solutions only when the book provides them. Cite the answer-key location.
- When no answer is supplied, state `No answer is provided in the source`; do not solve it from general knowledge.

### 6. Verify before delivery

Check that:

- every source chapter and section is represented or explicitly listed as unreadable or intentionally excluded by the user;
- every factual claim is supported by the supplied book;
- every image is labeled as either `From the book` or `AI-generated`;
- every generated image has a source-grounded generation brief;
- every exercise comes from the book;
- no external facts or invented additions appear;
- page and section references are accurate;
- uncertain extraction is visibly flagged.

## Output structure

Use this structure unless the user requests another format:

```markdown
# [Book title] — Detailed Summary

## Source information
- Author: [as stated in the book]
- Edition: [as stated, or "Not stated"]
- Source files: [filenames]
- Reference method: [PDF page + printed page, or Markdown headings]
- Extraction notes: [OCR issues, unreadable pages, missing assets, or "None"]

## Book overview
[A source-grounded overview with references]

## Detailed summary

### Part/Chapter 1: [Original title]

#### [Original section title]
[Detailed summary with source references]

##### Key terms
- **[Term]:** [definition as given by the book] [source]

##### Examples or cases from the book
- [Faithful summary of the book's example] [source]

##### Visuals
- **From the book:** [image + original caption or neutral label] [source]
- **AI-generated:** [image + required label + generation brief] [source]

##### Exercises from the book
1. [Verbatim or faithfully condensed exercise] [source]
   - Source answer: [only if supplied, with reference]

#### Section recap
[Concise recap containing only points established in this section, with references]

## Exercises index
[Exercise number, chapter/section, source location, and answer-key availability]

## Visuals index
[Asset filename, type, caption/label, and source location]

## Source limitations
[Unreadable, missing, ambiguous, or conflicting material; omit if none]
```

## Recommended project output

Unless the user specifies another location, organize deliverables as:

```text
outputs/[book-slug]/
├── detailed-summary.md
├── images/
│   ├── from-book/
│   └── generated/
└── source-map.md
```

Use stable, descriptive filenames. Never overwrite a source file.

## Final response

Report:

- the completed output path;
- which source files were processed;
- the number of chapters or main sections covered;
- the number of book images extracted and generated visuals created;
- the number of source exercises included;
- any unreadable, missing, ambiguous, or excluded material.
