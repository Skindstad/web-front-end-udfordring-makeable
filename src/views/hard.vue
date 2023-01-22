<template>
  <div>
    <h1 class="title">Welcomen to the hard quiz</h1>
    <br />
    <div class="card" v-for="item in list" v-bind:key="item.id">
      <div class="cardTitle">
        <b class="category">*{{ item.category }}</b>
      </div>
      <br />
      <div class="cardBody">
        <h1 class="question" v-html="item.question"></h1>
        <br />
        <form @submit.prevent="submit">
          <input type="hidden" :value="item.number" />
          <div
            class="radio"
            v-for="answer in item.answers"
            v-bind:key="answer.id"
          >
            <input
              type="radio"
              :name="item.number"
              :id="answer"
              v-bind:value="answer"
              v-model="item.selected"
            />
            <label class="answer" :for="answer" v-html="answer"></label>
          </div>
        </form>
        <div class="picked">
          <p>Your have picked: {{ item.selected }}</p>
        </div>
      </div>
    </div>
    <br />
    <div><button class="submit" @click="check">Submit</button><br /></div>
    <div class="score">
      <b>Score is: {{ score }}</b>
    </div>
  </div>
</template>
<script>
import store from "../store/index";
export default {
  name: "hardView",
  data() {
    return { list: [], score: 0 };
  },
  mounted() {
    let i = 1;
    store.state.listHard.forEach((questions) => {
      if (questions.incorrect_answers.length == 4) {
        console.log("the Answers is complete");
      } else {
        questions.incorrect_answers.push(questions.correct_answer);
      }

      for (let i = questions.incorrect_answers.length - 1; i >= 1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = questions.incorrect_answers[j];
        questions.incorrect_answers[j] = questions.incorrect_answers[i];
        questions.incorrect_answers[i] = temp;
      }
      this.list.push({
        number: i,
        type: questions.type,
        difficulty: questions.difficulty,
        category: questions.category,
        question: questions.question,
        correct_answer: questions.correct_answer,
        answers: questions.incorrect_answers,
        selected: null,
        result: null,
      });
      i++;
    });
  },
  methods: {
    check() {
      this.list.forEach((answer) => {
        if (answer.selected !== null) {
          if (answer.result == null) {
            if (answer.selected == answer.correct_answer) {
              alert(answer.question + " is correct");
              answer.result = "Correct";
              this.score++;
            } else {
              alert(answer.question + " is wrong");
              answer.result = "Wrong";
            }
          } else {
            alert("you has already answer is question: " + answer.question);
          }
        }
      });
    },
  },
};
</script>
