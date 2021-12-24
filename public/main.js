

(() => {
    console.log("JS on fire")

    let student_id = document.getElementById("student_id")
    let firstName = document.getElementById("firstName")
    let lastName = document.getElementById("lastName")
    let current_job = document.getElementById("current_job")
    let location = document.getElementById("location")

    let form = document.querySelector("form")

    form.addEventListener("submit", sendPOSTData)

    async function sendPOSTData (e) {
        e.preventDefault()

        try {
            let res = await fetch("/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student_id: student_id.value,
                firstName: firstName.value,
                lastName: lastName.value,
                current_job: current_job.value,
                location: location.value
            })
            })

            if(res.status === 200) {
                console.log("data inserted !")
            }
        } catch (err) {
            console.error(err)
        }
     }
})()