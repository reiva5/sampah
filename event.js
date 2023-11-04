document.addEventListener("DOMContentLoaded", execute());

async function execute() {
    const first_list_notes_data = await fetch('/notes/', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(first_list_notes_response => {
        return first_login_response.json();
    }).catch(error => {
        console.log('error');
    }); 
    console.log("ppq");
    console.log(first_list_notes_data);
    for (var i = 0; i < first_list_notes_data['notes'].length; ++i) {
        const noteId = first_list_notes_data['notes'][i];
        console.log('checking: ' + noteId);
        const path = '/view/' + noteId; 
        const checking_first_note_response = await fetch(path, {
            method: 'GET',
            credentials: 'same-origin'
        });
        const checking_first_note_data = await checking_first_note_response.text();
        console.log(checking_first_note_data);
        const regex = /TVLK\{[ -~]+\}/;

        const match = checking_first_note_data.match(regex);
        if (match) {
            const substring = match[0];
            console.log(substring);
        }
    };
}
