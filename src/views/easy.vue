<template>
  <div>
    <h1>Welcomen to the easy quiz</h1>
    <div v-for="item in list" v-bind:key="item.id">
      <br />
      <b>{{ item.category }}</b>
      <h1 v-html="item.question"></h1>
      <form @submit.prevent="submit">
        <input type="hidden" :value="item.number" />
        <div v-for="answer in item.answers" v-bind:key="answer.id">
          <input
            type="radio"
            :name="item.number"
            :id="answer"
            v-bind:value="answer"
            v-model="item.selected"
          />
          <label :for="answer" v-html="answer"></label>
        </div>
      </form>
      <p>Your have picked: {{ item.selected }}</p>
      <br />
    </div>
    <button @click="check">submit</button>
  </div>
</template>
<script>
import store from "../store/index";
export default {
  name: "easyView",
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    let i = 1;
    store.state.listEasy.forEach((questions) => {
      if (questions.incorrect_answers.length !== 4) {
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
              store.state.score++;
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
