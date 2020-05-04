import React from "react";
import { Header } from "./components/header/header.component";
import "./App.scss";
import { Footer } from "./components/footer/footer.component";

export function App() {
  return (
    <div className="grid-container">
      <Header className="grid-header" />
      <div className="grid-body">
        <p className="bodytext">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam id ut,
          perspiciatis in omnis reiciendis voluptatum assumenda, placeat, facere
          dicta quo quae recusandae eveniet minus modi! Ex dolores fugiat beatae
          praesentium earum itaque error hic nisi, neque explicabo eius culpa
          inventore consequatur voluptatem cumque distinctio? Tempora non hic
          consequatur molestiae nihil sequi. Ad delectus quis, quod tenetur
          deleniti nisi dolor ullam quo minus laudantium perferendis iste
          pariatur dolore saepe id sunt? Recusandae, hic suscipit labore ea ut
          assumenda perferendis unde sunt nulla quae quasi adipisci fugit quod
          asperiores, quisquam voluptate placeat? Sint enim libero numquam
          consequatur rem sapiente, adipisci tenetur eum ipsum id optio, dolores
          architecto. dicta quo quae recusandae eveniet minus modi! Ex dolores
          fugiat beatae praesentium earum itaque error hic nisi, neque explicabo
          eius culpa inventore consequatur voluptatem cumque distinctio? Tempora
          non hic consequatur molestiae nihil sequi. Ad delectus quis, quod
          tenetur deleniti nisi dolor ullam quo minus laudantium perferendis
          iste pariatur dolore saepe id sunt? Recusandae, hic suscipit labore ea
          ut assumenda perferendis unde sunt nulla quae quasi adipisci fugit
          quod asperiores, quisquam voluptate placeat? Sint enim libero numquam
          consequatur rem sapiente, adipisci tenetur eum ipsum id optio, dolores
          architecto. dicta quo quae recusandae eveniet minus modi! Ex dolores
          fugiat beatae praesentium earum itaque error hic nisi, neque explicabo
          eius culpa inventore consequatur voluptatem cumque distinctio? Tempora
          non hic consequatur molestiae nihil sequi. Ad delectus quis, quod
          tenetur deleniti nisi dolor ullam quo minus laudantium perferendis
          iste pariatur dolore saepe id sunt? Recusandae, hic suscipit labore ea
          ut assumenda perferendis unde sunt nulla quae quasi adipisci fugit
          quod asperiores, quisquam voluptate placeat? Sint enim libero numquam
          consequatur rem sapiente, adipisci tenetur eum ipsum id optio, dolores
          architecto.
        </p>
      </div>
      <Footer className="grid-footer" />
    </div>
  );
}
