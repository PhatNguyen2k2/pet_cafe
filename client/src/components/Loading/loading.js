import styles from './loading.scss';
const Loading = () => {
  return (
    <div class="loading-cat">
      <div class="cat-body"></div>
      <div class="cat-animation-mask"></div>
      <div class="cat-head">
        <div class="cat-face"></div>
        <div class="cat-ear"></div>
        <div class="cat-hand"></div>
        <div class="cat-eye"></div>
        <div class="cat-eye-light"></div>
        <div class="cat-mouth"></div>
        <div class="cat-beard left"></div>
        <div class="cat-beard right"></div>
      </div>
      <div class="cat-foot">
        <div class="cat-belly"></div>
        <div class="cat-leg"></div>
        <div class="cat-tail"></div>
      </div>
    </div>
  );
};

export default Loading;
