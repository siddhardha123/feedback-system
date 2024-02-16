import {Flex,Text} from "@chakra-ui/react";
import {useState} from "react";



const renderForm = () => {

}
// question = {type,name,question_data}


const QuestionSelection = () => {
    const [forms,setForms] = useState({
        name : "",
        questions : []
    })
    return (
        <Flex mx={'auto'}>
            <Flex>
                <Text fontSize={'3xl'}>Forms</Text>
                {/*{forms.map((form)=>(*/}
                {/*    <>*/}
                {/*       <Text>form.name</Text>*/}
                {/*        {*/}
                {/*            form.questions.map((question) => (*/}
                {/*                 <Text>question.name</Text>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </>*/}
                {/*))}*/}
            </Flex>


        </Flex>
    )

}

export  default QuestionSelection
