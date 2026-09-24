# Large Language Models for Business Analysts: A Practical Tutorial



## 1. What is an LLM?

A **large language model (LLM)** is a system trained on large amounts of text and other data to generate responses to an input, called a **prompt**. It can summarize, classify, compare, rewrite, and draft text. Many current LLMs use a **Transformer** architecture. When generating a response, a language model works with smaller text pieces called **tokens** and predicts what to produce next in context.

Think of it as a powerful assistant for **working with information and drafts**. Its fluent answer is not proof that the answer is correct, current, approved, or specific to your organization.

| Term | Plain meaning for a BA |
|---|---|
| **Prompt** | The task and instructions you give the model |
| **Context** | Information supplied with the task, such as meeting notes or a policy excerpt |
| **Token** | A unit the model uses to process text; not exactly a word |
| **Context window** | The amount of material the model can consider in one interaction; limits vary by model |
| **Hallucination / confabulation** | A plausible statement that is unsupported or false |
| **Grounding** | Connecting an answer to specific supplied or retrieved sources |
| **RAG** | Retrieval-augmented generation: finding relevant source material and providing it to the model before it responds |

## 2. How it fits into BA work

An LLM can speed up the *first pass* of work, but the BA still owns interpretation, validation, and stakeholder conversations.

| BA activity | Useful LLM assistance | What the BA still checks |
|---|---|---|
| Prepare elicitation | Draft interview questions and identify likely exceptions | Which questions matter for this project and stakeholder |
| Analyze meeting notes | Group decisions, requirements, assumptions, and open questions | Whether each statement was actually said or agreed |
| Draft requirements | Convert clear notes into structured draft requirements | Scope, wording, feasibility, priority, and approval |
| Find gaps | Suggest missing flows, actors, edge cases, and conflicting rules | Which gaps are real rather than generic suggestions |
| Write acceptance criteria | Suggest examples and testable conditions | Correct expected behavior and measurable outcomes |
| Communicate | Adapt an approved decision for different audiences | Accuracy, tone, confidentiality, and decision status |

**The safe mental model:** *source material → LLM draft → BA verification → stakeholder validation → controlled artifact*. The LLM sits inside the workflow; it does not replace the decision maker.

![BA workflow for working with an LLM](llm_ba_workflow.png)

[Open the BA workflow diagram](llm_ba_workflow.png)

## 3. Follow one practical example

Suppose you are analyzing **order cancellation** for an online shopping app. Your approved note-taking process produces this short excerpt:

> Operations: “Customers can cancel before warehouse packing starts.”  
> Support: “We sometimes accept a cancellation after packing if the parcel has not left.”  
> Product owner: “We need to decide whether that exception belongs in the app.”

There are three different kinds of information here: a stated general rule, a current exception, and an **open decision**. A weak LLM output might confidently write “Customers can cancel until dispatch” as an approved requirement. That would invent an agreement the group has **not** made.

### A better first prompt

```text
You are helping a business analyst analyze meeting notes.

Task: Separate confirmed statements, current exceptions, and open decisions.
Then draft candidate requirements only for statements supported by the notes.

Rules:
- Do not turn an open question into an approved requirement.
- For every item, quote or identify the supporting note.
- Mark missing information as "Needs confirmation".
- Do not invent time limits, roles, or refund rules.

Output columns:
ID | Type | Draft statement or question | Source | Confidence / issue

Notes:
[Paste the approved, appropriately redacted note excerpt here]
```

A useful draft might identify a candidate rule about **before packing**, record the **post-packing exception** separately, and ask whether self-service cancellation should cover that exception. The BA then confirms the facts with Operations, Support, and the product owner before publishing requirements.

## 4. Write prompts like a BA brief

A good prompt gives the model a clear task and boundaries. Use five parts:

| Part | What to provide | Example |
|---|---|---|
| **Goal** | The decision or artifact you need | “Prepare questions for a cancellation workshop.” |
| **Context** | The relevant, permitted source material | “Here are current rules and support notes.” |
| **Constraints** | What must not be assumed | “Do not infer a refund window.” |
| **Output format** | A table, list, or schema | “Give question, owner, and reason.” |
| **Evidence rule** | How claims must link to sources | “Cite the note ID; mark unsupported items.” |

**Reusable pattern:**

```text
Goal: [What I need the output for]
Context: [Relevant source text and project boundaries]
Task: [Specific transformation or analysis]
Constraints: [No invented facts; distinguish facts from assumptions]
Output: [Columns or headings]
Evidence: [Source ID or quote for each factual claim]
```

“Do not invent” is an instruction, **not a guarantee**. Compare the output against the source. Asking for source references makes review easier, but a model can still attach a real reference to an unsupported claim.

## 5. Four useful BA prompt examples

### A. Prepare stakeholder interviews

```text
Based only on the attached process description, draft 10 questions for the
customer-support lead. Group them into current workflow, exceptions,
information needed, and handoffs. For each question, say what uncertainty
it resolves. List any assumptions separately.
```

### B. Turn notes into candidate requirements

```text
Extract candidate requirements from these meeting notes. Use a table with:
ID | Candidate requirement | Exact supporting note | Open question | Owner to confirm.
Do not create a requirement from a suggestion or unresolved decision.
Mark contradictions instead of choosing a side.
```

### C. Check completeness

```text
Review these approved requirements for the order-cancellation journey.
List possible missing actors, status transitions, error paths, and
acceptance-test examples. Label each as "question to investigate".
Do not claim that a suggested case is part of the agreed scope.
```

### D. Explain an approved change

```text
Using only this approved change record, write two summaries:
1) a short business summary for the product owner;
2) a checklist of behavior changes for the QA team.
Preserve the release number and any unresolved risks. Add source IDs.
```

## 6. What the model knows—and what it does not

An LLM's trained knowledge can be useful for general concepts. It does **not automatically have** the current version of your company's policies, project scope, decisions, or production data. Those facts must come from an approved source you provide or from a connected retrieval system with appropriate access.

**RAG (retrieval-augmented generation)** is one way to bring relevant documents into a response. A search component retrieves passages, then the LLM uses those passages alongside the question. This can improve grounding, but retrieval can miss the right document, find an old version, or return irrelevant text. The BA still checks the **source, version, and exact claim**.

![How retrieval-augmented generation supports a BA question](llm_rag_for_ba.png)

[Open the RAG diagram](llm_rag_for_ba.png)

| Question | Where to look |
|---|---|
| “What does RAG mean?” | General explanation may be enough; check a reliable reference if needed |
| “What is our current cancellation rule?” | Current approved project document, with version and owner |
| “What did stakeholders decide yesterday?” | Approved meeting record or direct confirmation |
| “Does the live app already do this?” | Product evidence, test environment, logs, or team confirmation |

## 7. Review an LLM draft before using it

Use this checklist on every consequential output:

- [ ] **Source:** Can I locate evidence for each factual claim?
- [ ] **Status:** Are proposals, assumptions, and approved decisions labeled differently?
- [ ] **Scope:** Does the draft stay within the actual project and release?
- [ ] **Completeness:** Are exceptions, actors, and relevant non-functional needs considered?
- [ ] **Consistency:** Does it contradict another requirement or process rule?
- [ ] **Testability:** Could a tester tell whether the requirement has been met?
- [ ] **Ownership:** Did the right stakeholder validate or approve the result?
- [ ] **Traceability:** Can the final artifact link back to the source and decision?

**Example correction:** If the output says, “Refunds are completed within seven days,” but the notes contain no refund timing, remove that statement and record: “What is the required refund period, and who decides it?”

## 8. Risks a BA should recognize

| Risk | What it looks like | BA response |
|---|---|---|
| **Unsupported answer** | Model invents a policy, number, or citation | Verify against an authoritative source; mark unknowns |
| **Missing context** | Model overlooks a release constraint or exception | Supply targeted context and check the whole process |
| **Sensitive information exposure** | Real customer data is pasted into an unapproved tool | Follow company data rules; redact or use an approved environment |
| **Bias or one-sided framing** | Draft reflects one group but omits affected users | Review with diverse stakeholders and real evidence |
| **Prompt injection in sources** | A retrieved document contains instructions aimed at the model | Treat source text as evidence, not instructions; review output |
| **Overreliance** | A polished answer is accepted without checking | Keep BA review and decision ownership explicit |

For recordings and transcripts, follow your organization's consent, retention, and access rules. For sensitive decisions, use approved tools and human review. The required controls depend on the organization and the impact of a mistake.

## 9. How to try an LLM workflow responsibly

Start with one narrow task, such as drafting questions from an **approved, redacted** process description.

1. **Define success:** For example, “Questions cover all known exceptions and contain no invented facts.”
2. **Choose material:** Use a source you are authorized to share with the tool.
3. **Prompt:** Specify task, context, format, and evidence rules.
4. **Review:** Mark each output item as supported, unsupported, or worth investigating.
5. **Validate:** Discuss relevant questions and candidate requirements with stakeholders.
6. **Record:** Save the checked result in the normal project location with source links and decision status.
7. **Improve:** Note which prompt instructions worked and which errors took time to correct.

To evaluate whether the workflow helps, keep a small set of representative examples. Track **grounded claims, missed requirements, useful questions, and review time**. A longer answer or a confident tone is not a quality measure.

## 10. Quick exercise

Use the three-line cancellation meeting excerpt in section 3. Ask an LLM to create:

1. One candidate requirement supported by a note.
2. One statement describing the current exception.
3. Two questions that must be answered before the app's cancellation rule is finalized.

For every line, require a reference to the source note. Then check whether the output incorrectly treats the exception as an approved digital feature.

## Further reading

- [The Transformer architecture: *Attention Is All You Need*](https://arxiv.org/abs/1706.03762)
- [Original retrieval-augmented generation research](https://arxiv.org/abs/2005.11401)
- [IIBA: AI in business analysis and requirements work](https://www.iiba.org/business-analysis-blogs/enrich-business-analysis-experience-for-your-stakeholders-using-ai-tools/)
- [NIST: Generative AI Risk Management Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [IBM: Context windows and tokens](https://www.ibm.com/think/topics/context-window)


