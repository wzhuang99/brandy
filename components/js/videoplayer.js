"use strict";

app.component("videoplayer", {
    templateUrl: "components/view/videoplayer.html",
    controller: "videoplayerController",
    bindings: {}
});

app.controller("videoplayerController", function ($log, Quiz) {

    /**
     * Videogular API
     */
    let controller = this;
    controller.API = null;
    controller.onPlayerReady = function (API) {
        controller.API = API;
    };

    /**
     * All questions
     * @type {string[]}
     */
    this.quizQuestions = [
        "Was ist zu tun, wenn man selbst das Feuer sieht?",
        "Wie ist ein Feuerlöscher zu bedienen?",
        "Auf was muss beim Verlassen der Klasse geachtet werden?",
        "Warum darf der Lift nicht verwendet werden?",
        "Welcher Fluchtweg muss genommen werden?",
        "Was ist zu tun, wenn man in einen Stau geratet?",
        "Was ist zu tun, wenn Mitschüler während des Feueralarms außer Haus sind? (Freistunde/Pause)",
        "Wo muss man hin, nachdem man das Schulgebäude verlassen hat?",
        ""];

    /**
     * All possible answers
     * @type {string[]}
     */
    this.allAnswers = [
        "Sofort flüchten",
        "Ignorieren und weitergehen",
        "Brandmelder betätigen oder Kanzlei/Portier verständigen",
        "Feuer unter Einsatz des eigenen Lebens löschen",
        "Feuerlöscher ins Feuer werfen",
        "Feuerlöscher gewaltsam aufmachen und Inhalt ins Feuer werfen",
        "Jemanden um Hilfe fragen",
        "Anleitung auf dem Piktogramm befolgen",
        "Fenster und Tür schließen, aber nicht absperren",
        "So schnell wie möglich flüchten",
        "Gegenstände einpacken und gehen",
        "Versuchen das Feuer zu finden und selbst zu löschen",
        "Der Lift ist für Lehrpersonal reserviert",
        "Der Lift ist für körperlich eingeschränkte Personen reserviert",
        "Das Verwenden des Lifts dauert zu lange",
        "Es besteht Lebensgefahr",
        "Der kürzeste Weg ist zu nehmen",
        "Der schnellste Weg ist zu nehmen",
        "Der Ausgang durch die Hintertür",
        "Gar kein Fluchtweg, man bleibt in der Klasse und wartet auf die Feuerwehr",
        "Beim Stau warten",
        "Einen anderen Fluchtweg suchen",
        "Einen Lehrer holen",
        "Versuchen die Masse aufzuteilen",
        "Nichts tun und hoffen, dass denen nichts passiert",
        "Die Mitschüler suchen",
        "Die Mitschüler telefonisch kontaktieren und zum Sammelplatz beordern",
        "Die Mitschüler telefonisch kontaktieren und nach Hause schicken",
        "Heim gehen",
        "In den Turnsaal",
        "Zum Sammelplatz",
        "In der Klasse verstecken"
    ];

    /**
     * all solutions
     * @type {string[]}
     */
    this.solAns = [
        "Brandmelder betätigen oder Kanzlei/Portier verständigen",
        "Anleitung auf dem Piktogramm befolgen",
        "Fenster und Tür schließen, aber nicht absperren",
        "Es besteht Lebensgefahr",
        "Der schnellste Weg ist zu nehmen",
        "Einen anderen Fluchtweg suchen",
        "Die Mitschüler telefonisch kontaktieren und zum Sammelplatz beordern",
        "Zum Sammelplatz"
    ];

    /**
     * counter for evaluation
     * @type {number}
     */
    this.count = 0;

    /**
     * Create question object with all questions and answers
     * @type {Question}
     */
    this.quiz = new Quiz(this.quizQuestions, this.allAnswers);

    /**
     * Get all questions and answers as a Map
     * @type {Question.quiz} -> Map
     */
    this.ansPos = this.quiz.doQuiz();

    /**
     * Show/hide first question
     * @type {boolean}
     */
    this.showFirst = false;

    /**
     * Show/hide quiz questions
     * @type {boolean}
     */
    this.showQuiz = false;

    /**
     * Show/hide evaluate answers
     * @type {boolean}
     */
    this.showAnswer = false;

    /**
     * Disable video controls
     * @type {boolean}
     */
    this.showControl = true;

    /***
     * Videogular cuepoint objects
     * @type {{}}
     */
    let intro = {};
    let scene1 = {};
    let scene2 = {};
    let scene3 = {};
    let scene4 = {};
    let scene5 = {};
    let scene6 = {};
    let scene7 = {};
    let scene8 = {};
    let timePoint = [];

    /**
     * timeLapse objects (start - end)
     * @type {{start: number, end: number}}
     */
    intro.timeLapse = {
        start: 0,
        end: 6
    };
    scene1.timeLapse = {
        start: 7,
        end: 55
    };
    scene2.timeLapse = {
        start: 60,
        end: 85
    };
    scene3.timeLapse = {
        start: 86,
        end: 162
    };
    scene4.timeLapse = {
        start: 163,
        end: 174.3
    };
    scene5.timeLapse = {
        start: 175,
        end: 198
    };
    scene6.timeLapse = {
        start: 200,
        end: 228
    };
    scene7.timeLapse = {
        start: 229,
        end: 248.7
    };
    scene8.timeLapse = {
        start: 249.5,
        end: 284
    };

    /**
     * show/hide changed button color
     * @param number
     */
    this.changeCol = (number) => {
        this.btnCol1 = false;
        this.btnCol2 = false;
        this.btnCol3 = false;
        this.btnCol4 = false;
        this.btnCol5 = false;
        this.btnCol6 = false;
        this.btnCol7 = false;
        this.btnCol8 = false;
        switch (number) {
            case 0:
                this.btnCol1 = true;
                break;
            case 1:
                this.btnCol2 = true;
                break;
            case 2:
                this.btnCol3 = true;
                break;
            case 3:
                this.btnCol4 = true;
                break;
            case 4:
                this.btnCol5 = true;
                break;
            case 5:
                this.btnCol6 = true;
                break;
            case 6:
                this.btnCol7 = true;
                break;
            case 7:
                this.btnCol8 = true;
                break;
        }
    };

    /**
     * start video at time
     * clear checkboxes
     * @param time in seconds
     */
    this.scene = (time) => {
        this.showFirst = false;
        this.showAnswer = false;
        this.showControl = true;
        controller.API.seekTime(time);
        controller.API.play();
        this.answerOpt = "";
    };

    /**
     * pause video
     * show quiz
     * disable video controls
     * change quiz questions
     * change answer possibilities
     * @param number determine quiz question and which button has to change color
     */
    this.interactive = (number) => {
        controller.API.pause();
        this.showControl = false;
        this.showQuiz = true;
        this.changeCol(number);
        this.question = this.quizQuestions[number];
        this.count = number;
        this.answer1 = this.ansPos.get(number)[0];
        this.answer2 = this.ansPos.get(number)[1];
        this.answer3 = this.ansPos.get(number)[2];
        this.answer4 = this.ansPos.get(number)[3];
    };

    /**
     * evaluate user answers with solution
     */
    this.corrAnswer = () => {
        this.showQuiz = false;
        this.showAnswer = true;
        if (this.question === this.quizQuestions[this.count]) {
            if(this.answerOpt === this.solAns[this.count]){
                this.correct = "Richtig!";
            } else {
                this.correct = "Leider falsch!";
            }
            this.solution = this.solAns[this.count];
        }
    };

    /**
     * callback function, triggered after timelapse.end
     * will not trigger when controller.API.currentTime > time
     */
    intro.onComplete = () => {
        if(controller.API.currentTime < 6500){
            controller.API.pause();
            this.showControl = false;
            this.showFirst = true;
        }
    };

    scene1.onComplete = () => {
        if (controller.API.currentTime < 60000) {
            this.interactive(0);
        }
    };


    scene2.onComplete = () => {
        if (controller.API.currentTime < 85900) {
            this.interactive(1);
        }
    };

    scene3.onComplete = () => {
        if (controller.API.currentTime < 162900) {
            this.interactive(2);
        }
    };

    scene4.onComplete = () => {
        if (controller.API.currentTime < 174900) {
            this.interactive(3);
        }
    };

    scene5.onComplete = () => {
        if (controller.API.currentTime < 199900) {
            this.interactive(4);
        }
    };

    scene6.onComplete = () => {
        if (controller.API.currentTime < 228900) {
            this.interactive(5);
        }
    };

    scene7.onComplete = () => {
        if (controller.API.currentTime < 249400) {
            this.interactive(6);

        }
    };

    scene8.onComplete = () => {
        if (controller.API.currentTime < 286000) {
            this.interactive(7);
        }
    };




    /**
     * add objects to array
     */
    timePoint.push(intro, scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8);

    /**
     * Videogular configuration
     * @type {{cuePoints: {timePoint: []}, sources: [{src: string, type: string}], plugins: {poster: string}, theme: string}}
     */
    controller.config = {
        sources: [
            {src: "components/material/brandy_schueler.mp4", type:"video/mp4"}
        ],
        theme: "node_modules/videogular-themes-default/videogular.css",
        cuePoints: {
            timePoint: timePoint
        },
    };


});