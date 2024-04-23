import CreateGen from "./list";

const maker = CreateGen();
const listMaker = (project_name) => {
  return maker(project_name);
};

export default function ProjectGen() {
  let projcetNum = 0;

  return function CreateProject(project_namea) {
    const number = projcetNum;
    const project_name = project_namea;
    projcetNum++;
    const list = listMaker(project_namea);

    return { number, list, project_name };
  };
}
