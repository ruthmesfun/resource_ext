window.addEventListener('DOMContentLoaded', (event) => {
    const dropdown = document.getElementById('grades')
    const form = document.querySelector('form')
    const checkbox = document.getElementById('standards')
    let standards = [];

    fetch('/math.json')
    .then((r) => r.json())
    .then(data => {
        let standards = {}

        for (let standard of data["LearningStandards"]["LearningStandardItem"])
        {
            if(standard["GradeLevels"]["GradeLevel"] === 'K'){
                const ccss = standard["StatementCodes"]["StatementCode"]
                // standards['K'][`${ccss}`] = standard["Statements"]["Statement"]
                
            }
        }
        
    })
    // event.target.body.innerHTML = standards

    //EventListener for the dropdown to grab common core standards from grades

    dropdown.addEventListener('change', (event) => {
        const grade = event.target.value

        fetch('/math.json')
        .then((r) => r.json())
        .then(data => {   
            let checkBoxList = '';

            for (let standard of data["LearningStandards"]["LearningStandardItem"])
            {
                if(standard["GradeLevels"]["GradeLevel"] === grade || standard["GradeLevels"]["GradeLevel"].includes(grade)){
                    const ccss = standard["StatementCodes"]["StatementCode"].split('.')



                    const parsedCCSS = ccss.slice(3,ccss.length).join('.')
                    // standards['K'][`${ccss}`] = standard["Statements"]["Statement"]
                    checkBoxList += `<option value= ${parsedCCSS} id= ${parsedCCSS} class= 'standards'>${parsedCCSS}</option>`
                }
            }
            
            document.querySelector('#standards').innerHTML = `<label for="exampleFormControlSelect2">Pick all the standards you need:</label>
            <select multiple class="form-control" id="checkbox_grades" multiple >
            </select>`
            
            document.querySelector('#checkbox_grades').innerHTML  = checkBoxList
            
        })
    } )

    checkbox.addEventListener('click', (event) =>{
        let ccss = event.target.selectedOptions

        for(let s of ccss){
            standards.push(s.value)
        }

       
    })


    form.addEventListener('submit', (event) => {
        const standardsLink = standards.join(',')

        const url = `https://www.teacherspayteachers.com/Browse/Core-Standard/${standardsLink}`
        
        window.open(url,'_blank')
    })
})