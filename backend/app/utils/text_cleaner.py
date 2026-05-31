import re


def clean_llm_output(text: str) -> str:
    """Strip markdown fences and leading/trailing whitespace from LLM output."""
    text = re.sub(r"^```[a-z]*\n?", "", text.strip(), flags=re.IGNORECASE)
    text = re.sub(r"\n?```$", "", text.strip())
    return text.strip()


def extract_subject_and_body(email_text: str) -> tuple[str, str]:
    """
    Split a raw email string that may start with 'Subject: ...' into
    (subject, body). If no Subject line is found, returns ('', full_text).
    """
    text = clean_llm_output(email_text)
    lines = text.splitlines()

    subject = ""
    body_start = 0

    if lines and lines[0].lower().startswith("subject:"):
        subject = lines[0].split(":", 1)[1].strip()
        # Skip blank line after Subject:
        body_start = 2 if len(lines) > 1 and not lines[1].strip() else 1

    body = "\n".join(lines[body_start:]).strip()
    return subject, body


def tokenize(text: str) -> list[str]:
    """Lowercase, strip punctuation, return word tokens."""
    return re.findall(r"\b[a-z]{2,}\b", text.lower())
