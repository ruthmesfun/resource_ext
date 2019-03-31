window.addEventListener('DOMContentLoaded', (event) => {
    const grades = document.getElementById('grades')
    const subjects = document.getElementById('subjects')
    const form = document.querySelector('form')
    const checkbox = document.getElementById('standards')
    let subject = 'ela'
    let grade = 'k'

    let standards = []

    // Function that updates standards based on the grade and subject
    const changeStandards = (grade, subject) => {
        if(subject === 'math'){
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
            }
            else{
                fetch('/ela.json')
                .then((r) => r.json())
                .then(data => {   
                    let checkBoxList = '';
        
                    for (let standard of data["LearningStandards"]["LearningStandardItem"])
                    {
                        if(standard["GradeLevels"]["GradeLevel"] === grade || standard["GradeLevels"]["GradeLevel"].includes(grade)){
                            const ccss = standard["StatementCodes"]["StatementCode"].split('.')
                            const parsedCCSS = ccss.slice(2,ccss.length).join('.')
                            // standards['K'][`${ccss}`] = standard["Statements"]["Statement"]
                            checkBoxList += `<option value= ${parsedCCSS} id= ${parsedCCSS} class= 'standards'>${parsedCCSS}</option>`
                        }
                    }
                    
                    document.querySelector('#standards').innerHTML = `<label for="exampleFormControlSelect2">Pick all the standards you need:</label>
                    <select multiple class="form-control" id="checkbox_grades" multiple >
                    </select>`
                    
                    document.querySelector('#checkbox_grades').innerHTML  = checkBoxList
                    
                })
    
            }
    
    }

    //Updates standards based on updated grade
    grades.addEventListener('change', (event) => {
        grade = event.target.value
        changeStandards(grade, subject)
        

    })

    //Updates standards based on subject
    subjects.addEventListener('change', event => {
        subject = event.target.value

        changeStandards(grade, subject)

    })

    //Adds standards in the standard array
    checkbox.addEventListener('click', (event) =>{
        let ccss = event.target.selectedOptions

        for(let s of ccss){
            standards.push(s.value)
        }

       
    })


    //submits for and redirct to TpT
    form.addEventListener('submit', (event) => {
        const standardsLink = standards.join(',')

        const url = `https://www.teacherspayteachers.com/Browse/Core-Standard/${standardsLink}`
        
        window.open(url,'_blank')
    })
})