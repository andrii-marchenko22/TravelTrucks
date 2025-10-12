import css from './loading.module.css';

const Loader = () => (
  <div className={css['sk-folding-cube']}>
    <div className={`${css.skCube} ${css.skCube1}`}></div>
    <div className={`${css.skCube} ${css.skCube2}`}></div>
    <div className={`${css.skCube} ${css.skCube4}`}></div>
    <div className={`${css.skCube} ${css.skCube3}`}></div>
  </div>
);

export default Loader;
