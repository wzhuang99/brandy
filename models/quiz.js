"use strict";

/**
 * Factory for questions and answers
 */
app.factory("Quiz", function () {

    function Quiz(questions, answers) {

        /**
         * attributes
         */
        this.question = questions;
        this.answers = answers;

        /**
         * counter for loop
         * @type {number}
         */
        let num = 3;

        /**
         * temp. array for 4 answers
         * @type {*[]}
         */
        let ansPos = [];

        /**
         * counter for second loop
         * @type {number}
         */
        let j = 0;

        /**
         * Map for all answers
         * @type {Map<any, any>}
         */
        this.quiz = new Map();

        /**
         * stores 4 possible answers into ansPos
         * @returns {Map<any, any>}
         */
        this.doQuiz = () => {
            for(let i = 0; i<this.question.length; i++){
                for(let k=j;k<=num; k++){
                    ansPos.push(this.answers[k]);
                    this.quiz.set(i, ansPos);
                }
                j += 4;
                num += 4;
                ansPos = [];
            }
            return this.quiz;
        }
    }

    return Quiz;
});
