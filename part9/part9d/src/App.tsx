import type React from "react";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartBaseWithDescription {
  requirements: string[]
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ courseParts }: {courseParts: CoursePart[]}): React.ReactElement => {

  return (
    <>
      {courseParts.map(part => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name}>
                <p>name: {part.name}</p>
                <p>exerciseCount: {part.exerciseCount}</p>
                <p>description: {part.description}</p>
                <br />
              </div>
            );
          case "group":
            return (
              <div key={part.name}>
                <p>name: {part.name}</p>
                <p>exerciseCount: {part.exerciseCount}</p>
                <p>groupProjectCount: {part.groupProjectCount}</p>
                <br />
              </div>
            );
          case "background":
            return (
              <div key={part.name}>
                <p>name: {part.name}</p>
                <p>exerciseCount: {part.exerciseCount}</p>
                <p>description: {part.description}</p>
                <p>backgroundMaterial: {part.backgroundMaterial}</p> 
                <br />       
              </div>
            );
          case "special":
            return (
              <div key={part.name}>
                <p>name: {part.name}</p>
                <p>exerciseCount: {part.exerciseCount}</p>
                <p>description: {part.description}</p>
                <p>requirements: {part.requirements}</p>
                <br />    
              </div>
            );            
          default:
            return assertNever(part);
        }
      })}    
    </>
  )
}


// import React from "react";

const Header = ({ courseName }: { courseName: string}): React.ReactElement => {

  return (
    <>
      <h1>{courseName}</h1>
    </>
  )
}

const Content  = ({courseParts}: {courseParts: CoursePart[]}): React.ReactElement => {

  return (
    <>
      <Part courseParts={courseParts} />
    </>
  )
}

const Total = ({ totalExercises }: {totalExercises: number}): React.ReactElement => {

  return (
    <>
      <p>
        Number of exercises {totalExercises}
      </p>
    </>
  )
}

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;