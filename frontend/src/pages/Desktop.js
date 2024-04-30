import { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, SplitButton } from "react-bootstrap";
import MenuBar1 from "../components/MenuBar1";
import styles from "./Desktop.module.css";

const Desktop = () => {
  const onSAVEClick = useCallback(() => {
    //TODO: alert("saved successfully");
  }, []);

  const onSAVE1Click = useCallback(() => {
    //TODO: alert("saved successfully");
  }, []);

  const onConfirmAndSaveClick = useCallback(() => {
    //TODO: alert("confirmed");
  }, []);

  const onAddNewClick = useCallback(() => {
    //TODO: alert("added");
  }, []);

  const onAddNew1Click = useCallback(() => {
    //TODO: alert("added");
  }, []);

  const onDelete1Click = useCallback(() => {
    //TODO: alert("deleted");
  }, []);

  const onDelete2Click = useCallback(() => {
    //TODO: alert("deleted");
  }, []);

  const onDelete3Click = useCallback(() => {
    //TODO: alert("deleted");
  }, []);

  const onDelete4Click = useCallback(() => {
    //TODO: alert("deleted");
  }, []);

  return (
    <div className={styles.desktop1}>
      <main className={styles.maskGroup}>
        <h1 className={styles.createGoals} id="SUB NAME">
          CREATE GOALS
        </h1>
        <input className={styles.maskGroupChild} type="text" />
        <textarea className={styles.maskGroupItem} />
        <h3 className={styles.createAnExercise}>Create an exercise</h3>
        <div className={styles.name}>Name</div>
        <textarea className={styles.maskGroupInner} />
        <div className={styles.reps}>Reps</div>
        <textarea className={styles.rectangleTextarea} />
        <div className={styles.minutes}>Minutes</div>
        <button className={styles.rectangleButton} />
        <button className={styles.save} onClick={onSAVEClick}>
          SAVE
        </button>
        <h2 className={styles.createADiet}>Create a Diet</h2>
        <input className={styles.rectangleInput} type="text" />
        <div className={styles.dietName}>Diet name</div>
        <textarea className={styles.maskGroupChild1} />
        <div className={styles.quantity}>
          <p className={styles.quantity1}>Quantity</p>
        </div>
        <img className={styles.rectangleIcon} alt="" src="/rectangle-9.svg" />
        <textarea
          className={styles.totalCalories}
          placeholder="Total calories"
        />
        <button className={styles.maskGroupChild2} />
        <button className={styles.save1} onClick={onSAVE1Click}>
          SAVE
        </button>
        <button className={styles.maskGroupChild3} />
        <button
          className={styles.confirmAndSave}
          onClick={onConfirmAndSaveClick}
        >
          Confirm and Save
        </button>
        <button className={styles.addNew} onClick={onAddNewClick} />
        <button className={styles.addNew1} onClick={onAddNew1Click} />
        <h1 className={styles.fitbuddy} id="APP NAME">
          FitBuddy
        </h1>
        <button className={styles.menu} />
        <h2 className={styles.exercisesAdded}>Exercises Added</h2>
        <input className={styles.maskGroupChild4} type="text" />
        <input className={styles.maskGroupChild5} type="text" />
        <h2 className={styles.dietsAdded}>Diets Added</h2>
        <input className={styles.maskGroupChild6} type="text" />
        <input className={styles.maskGroupChild7} type="text" />
        <button className={styles.delete} />
        <button className={styles.delete1} onClick={onDelete1Click} />
        <button className={styles.delete2} onClick={onDelete2Click} />
        <button className={styles.delete3} onClick={onDelete3Click} />
        <h2 className={styles.myGoals}>MY GOALS</h2>
        <input className={styles.maskGroupChild8} type="text" />
        <input className={styles.maskGroupChild9} type="text" />
        <img className={styles.icon} alt="" src="/8443654-1@2x.png" />
        <button className={styles.delete4} onClick={onDelete4Click} />
        <SplitButton
          className={styles.components}
          title="Select Time"
          size="lg"
        >{` `}</SplitButton>
        <MenuBar1 />
        <input className={styles.maskGroupChild10} type="text" />
        <div className={styles.exercise}>exercise</div>
      </main>
    </div>
  );
};

export default Desktop;
