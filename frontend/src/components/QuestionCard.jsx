import { Button, Form, RadialSelectInput } from "./Components";


const HexagonCard = ({ children, width = "w-[300px]", height = "h-[100px]" }) => {
    return (
      <div className={`relative ${width} ${height} border-purple-700 border-1 text-white text-center font-bold mx-auto my-12 leading-[100px] [clip-path:polygon(10%_0%,90%_0%,100%_50%,90%_100%,10%_100%,0%_50%)]`}>
        {children}
      </div>
    );
}

const QuestionDiv = ({ questionContent}) => {
    return (
        <p className="text-md p-2">
            {questionContent}
        </p>
    )
}

export default function QuestionCard({ item, buttonText, handleAnswerSubmit }) {
    return (
        <Form onSubmit={handleAnswerSubmit}>
            <HexagonCard children={<QuestionDiv questionContent={item.question}/>} />
            <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <RadialSelectInput id={item.optionA} value={item.optionA} name="answer-option"/>
            </div>
            <Button children={buttonText} type="submit"/>
        </Form>
    )
}