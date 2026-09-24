# Git and GitHub for Business Analysts

**Who this is for:** BAs who collaborate with a software team but have little technical background. You can start by reading and reviewing work on GitHub; the command line is optional.

## 1. The main idea

**Version control** records changes to files over time. It helps a team answer: *What changed? Who changed it? Why? What did the file look like before?* In software projects, the common version control tool is **Git**.

**GitHub** is an online service for hosting Git projects and collaborating through issues, pull requests, and reviews. **Git is the version control system; GitHub is one place teams share and review its history.** A project can use Git without GitHub, and other hosting services exist.

| What a BA may need to do | How Git/GitHub helps |
|---|---|
| Find the current documentation | Open a file on the project's main branch |
| Understand a change | Read a pull request's description and file differences |
| Ask a question about a rule | Comment on the relevant line of a pull request |
| Check whether work was completed | Follow the linked issue and merged pull request |
| Cite an exact version | Use a link tied to a particular commit |

## 2. A small example to follow

Imagine a team building an **online shopping app**. The project lives in a GitHub **repository**, often shortened to **repo**. It contains code and a text file called `docs/checkout-rules.md`.

A new rule needs review: “Free shipping applies when the basket subtotal **after discounts** is at least $50.” A developer updates both the code and the documentation on a separate branch. The BA reviews the proposed change in a pull request and asks whether tax counts toward the threshold.

You do **not** need to read every code file to participate. Start with the behavior described in the pull request, the changed requirement or rule, and the acceptance criteria or tests.

## 3. Understand the basic vocabulary

| Term | Plain meaning | Shopping app example |
|---|---|---|
| **Repository (repo)** | A project folder with Git history | The shopping app project |
| **Local** | A copy on someone's computer | A developer's copy of the repo |
| **Remote** | A shared copy on a server | The team's repo on GitHub |
| **Clone** | Download a working copy **with Git history and connection to the remote** | Copy the repo to a computer |
| **Working files** | Files being edited before a change is saved to Git history | `checkout-rules.md` while edited |
| **Staging area** | A selection of changes prepared for the next commit | Only the intended documentation change |
| **Commit** | A recorded snapshot of staged changes, with a message and ID | “Clarify free-shipping threshold” |
| **Branch** | A separate line of work from a chosen starting point | `docs/free-shipping-rule` |
| **main** | A common name for the primary branch; your team may use another | The project's current shared branch |
| **Push** | Send local commits to the remote | Publish the branch to GitHub |
| **Pull** | Bring remote changes into the local branch | Update a local copy before editing |
| **Diff** | The exact lines removed and added | Old shipping rule versus new one |
| **Pull request (PR)** | A request to review and merge one branch into another | Propose the rule and code change |
| **Merge** | Incorporate approved branch changes into the target branch | Add the reviewed change to `main` |

A **commit** records history; it does not send changes to GitHub by itself. A **push** publishes commits. A **pull request** is a review conversation, not the same thing as the `git pull` command.

## 4. Picture the local-to-GitHub workflow

![Git workflow from working files to GitHub](git_workflow_local_remote.png)

[Open the local-to-GitHub diagram](git_workflow_local_remote.png)

The usual direction is:

1. **Edit** a file in your working copy.
2. **Stage** selected changes with `git add`.
3. **Commit** them to local Git history with `git commit`.
4. **Push** the branch to GitHub with `git push`.
5. **Pull** updates from GitHub when you need to update your local branch.

Think of the staging area as a **packing table**: you select what belongs in the next package. The commit seals that package in local history; the push delivers it to the shared copy. The analogy is useful, but the actual files remain editable after a commit.

## 5. Why does the team use branches?

A **branch** lets someone work on a change without immediately changing the primary branch. The person can make several commits on the feature branch, then propose the result for review.

![Branch and pull request workflow](git_branch_pull_request.png)

In our example, the developer creates `docs/free-shipping-rule`, updates the rule and code, and opens a PR into `main`. The BA and other reviewers discuss the change. After the required checks and reviews, an authorized team member merges it. The team may then delete the short-lived branch; the merged history remains.

A **fork** is different: it is a separate copy of a repository under another account or organization, often used when the contributor does not have write access to the original repo. Most BAs on an internal team can start by understanding branches and PRs.

## 6. How to read a pull request as a BA

On GitHub, open the repository and select **Pull requests**. A PR typically has a description, a **Conversation** tab, a **Commits** tab, and a **Files changed** tab. The exact screen layout can change, but these concepts are stable.

| Where to look | What to check |
|---|---|
| PR title and description | What problem is this solving? Which issue or requirement is linked? |
| Files changed | What behavior, wording, or test cases changed? |
| Conversation | What questions and decisions have reviewers recorded? |
| Checks and review status | Are required checks and reviews complete? |

A **diff** commonly shows removed lines in red with `-` and added lines in green with `+`:

```diff
- Free shipping applies when the basket total is at least $50.
+ Free shipping applies when the basket subtotal after discounts is at least $50.
```

![Example of a pull request diff with a BA review question](git_pull_request_diff_example.png)

**Good BA comment:** “Does the $50 threshold exclude tax and delivery fees? Please add an example for a $55 basket with a $10 discount.” This identifies an ambiguity and suggests an observable test case. A vague “Looks wrong” gives the team less to act on.

GitHub reviews can include a comment, an approval, or a request for changes. Only approve on behalf of a role when your team has given you that responsibility. A merged PR shows that changes were incorporated; confirm separately whether that means the feature is released to users.

## 7. A browser-first workflow for BAs

You can do these tasks without installing Git:

1. **Read the repo:** Open the project's GitHub page. Choose the correct branch using the branch selector, then open a `README.md` or documentation file.
2. **Look at history:** Open a file and find its **History** view to see past commits. If you need a link to exactly what you saw, use a link pinned to a commit rather than a moving branch.
3. **Track work:** Open an **Issue** to describe a bug, question, or proposed improvement if that is your team's process. Link a requirement or acceptance criterion.
4. **Review a PR:** Read its purpose, open **Files changed**, comment on specific lines, and check the response before resolving your question.
5. **Propose a small documentation edit:** If you have permission, edit a Markdown file in the web interface, save it on a new branch, and open a PR. Follow your team's review rules.

**Issue vs PR:** An issue describes work or a discussion to be resolved. A PR proposes a particular set of file changes. Teams often link the two, but neither replaces the other.

## 8. Optional: what the common Git commands do

You can learn the workflow through GitHub's website or GitHub Desktop. The commands below are a reading guide for conversations with developers; try them only in a repository where you have access and know the team's workflow.

```bash
git clone <repository-url>                # Make a local working copy
cd <repository-folder>
git switch main                         # Move to the main branch
git pull                                # Update that local branch
git switch -c docs/free-shipping-rule   # Start a new branch
# Edit docs/checkout-rules.md in a text editor
git status                              # See modified files
git diff                                # Review unstaged changes
git add docs/checkout-rules.md          # Stage this file
git commit -m "Clarify free-shipping threshold"
git push -u origin docs/free-shipping-rule
# Open a pull request on GitHub
```

`<repository-url>` and `<repository-folder>` are placeholders, not commands to paste literally. This example assumes the primary branch is named `main` and the working copy is clean before the pull. If the team uses another branch name or special access rules, follow its instructions.

**`git status` is your first diagnostic command.** It tells you which branch you are on and whether you have local changes. `git diff` helps you see *what* changed before making a commit. The `-u origin` part of the first push tells Git which remote branch to associate with this local branch.

## 9. Common confusions, explained

| Confusion | What to remember |
|---|---|
| **Git vs GitHub** | Git tracks history; GitHub hosts and helps teams review shared repositories. |
| **Commit vs push** | Commit saves locally; push publishes local commits to a remote. |
| **Pull vs pull request** | `git pull` updates a local branch; a PR proposes and reviews a merge on GitHub. |
| **Branch vs fork** | A branch is another line of work in a repo; a fork is another copy of the repo under a different owner. |
| **Clone vs download ZIP** | Clone includes Git history and a remote connection; a ZIP is just a file snapshot. |
| **Merge vs deploy** | Merge updates a branch; deployment is a separate step that makes software available in an environment. |
| **Commit ID vs version label** | A commit ID identifies a precise Git snapshot; `v1.0` is a team-defined label or tag, if used. |

A **merge conflict** occurs when Git cannot automatically combine certain changes, often because two people edited the same lines. It asks a person to decide what the final content should be. As a BA, you may need to clarify the intended business rule even if a developer resolves the file conflict.

## 10. Good habits for BAs in a software repo

- Read the PR's **purpose and diff** before commenting on its implementation details.
- Ask about behavior and examples: inputs, outcomes, exceptions, and acceptance criteria.
- Link issues, requirements, and PRs so the reason for a change is findable.
- Check the **branch and commit** when citing a file; a link to `main` may show different content later.
- Do not put customer data, passwords, API keys, or confidential exports into a repo without the team's approved process.
- Know that Git shows line-by-line changes best for text files such as `.md`, `.txt`, and source code. A Word or PDF file can be stored in Git, but its detailed changes may be harder to review in a diff.
- Ask who may **approve and merge**. A BA's review is valuable, but permission and responsibility vary by team.

## 11. Practice without writing code

Use a PR from a project you are allowed to inspect, or ask your team for a safe sample PR. Answer these questions:

1. What branch is the PR changing **from**, and what branch is it proposing to change **into**?
2. What problem or issue is linked?
3. Which file and line explain the new behavior?
4. What tests or examples show the behavior works?
5. What question would you ask before agreeing with the business outcome?

**Sample answer for the shopping app:** “The description says discounts affect free shipping. In the changed rule, is the threshold based on subtotal before tax? Please add an acceptance test for a $55 subtotal with a $10 discount.”

## Further reading

- [GitHub Docs: What is Git and how does it relate to GitHub?](https://docs.github.com/en/get-started/using-git/about-git)
- [GitHub Docs: Getting started with Git](https://docs.github.com/en/get-started/learning-to-code/getting-started-with-git)
- [Git book: Recording changes and the staging area](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
- [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/get-started/about-pull-requests)
- [GitHub Docs: Reviewing proposed changes](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/reviewing-proposed-changes-in-a-pull-request)


