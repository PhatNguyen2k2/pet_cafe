import SignUp from '../../components/Auth/signUp';
import Overlay from '../../components/Overlays/overlay';

const ViewSignUp = () => {
  return (
    <>
      <Overlay
        className="h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2016/03/17/06/49/renovation-1262389_960_720.png")`,
        }}
      >
        <SignUp />
      </Overlay>
    </>
  );
};

export default ViewSignUp;
