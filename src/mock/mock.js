import Mock from "mockjs";

const Random = Mock.Random;

function getData() {
  const datalist = [];

  return {
    data: datalist
  };
}
const data = Mock.mock("/msg1", getData);
export default { data };
