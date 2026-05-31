from app.utils.timestamp import utc_now_str
from app.utils.logger import get_logger

logger = get_logger(__name__)

_DIVIDER = "=" * 72


def send_draft_via_mcp(email_address: str, email_body: str) -> None:
    """
    MCP Automation Simulation.

    Automatically triggered after each successful invitation generation.
    Logs the recipient address, full email body, and a clean UTC timestamp
    to stdout and the application logger — simulating dispatch via an
    MCP-connected mail service.

    Args:
        email_address: The recipient's email address.
        email_body:    The full generated email text (subject + body).
    """
    timestamp = utc_now_str()

    log_block = (
        f"\n{_DIVIDER}\n"
        f"  [MCP AUTOMATION TRIGGER] — Draft Email Dispatched\n"
        f"{_DIVIDER}\n"
        f"  Timestamp  : {timestamp}\n"
        f"  Recipient  : {email_address}\n"
        f"{_DIVIDER}\n"
        f"  Email Body :\n\n"
        f"{email_body}\n"
        f"{_DIVIDER}\n"
    )

    # Print to stdout (visible in Render / server logs)
    print(log_block, flush=True)

    # Also route through structured logger
    logger.info(
        "MCP trigger fired | recipient=%s | timestamp=%s",
        email_address,
        timestamp,
    )
