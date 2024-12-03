# New Note Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes in the text field and clicks "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Response confirming note creation (200 OK)
    deactivate server

    Note over browser: The browser updates the UI to show the new note
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated JSON with the new note
    deactivate server

    Note right of browser: The browser renders the new note along with the existing ones
