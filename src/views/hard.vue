<template>
  <div>
    <h1>Welcomen to the hard quiz</h1>
    <div>
      <div v-for="item in list" v-bind:key="item.id">
        <br />
        <b>{{ item.category }}</b>
        <h2 v-html="item.question"></h2>
        <form>
          <div v-for="answer in item.answers" v-bind:key="answer.id">
            <input
              type="radio"
              :name="item.number"
              :id="answer"
              :value="answer"
            />
            <label :for="answer">{{ answer }}</label>
          </div>
        </form>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "../store/index";
export default {
  name: "hardView",
  data() {
    return { list: [] };
  },
  mounted() {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple&token=" +
          store.state.token
      )
      .then((response) => {
        let i = 1;
        response.data.results.forEach((questions) => {
          questions.incorrect_answers.push(questions.correct_answer);

          for (let i = questions.incorrect_answers.length - 1; i >= 1; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
            let temp = questions.incorrect_answers[j];
            questions.incorrect_answers[j] = questions.incorrect_answers[i];
            questions.incorrect_answers[i] = temp;
          }
          this.list.push({
            number: i,
            category: questions.category,
            question: questions.question,
            correct_answer: questions.correct_answer,
            answers: questions.incorrect_answers,
            selected: null,
          });
          i++;
        });
      });
  },
};
</script>
