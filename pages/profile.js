import { useUser } from '../lib/hooks';
import Loading from '../components/loading';

const Profile = () => {
  const user = useUser();

  return (
    <>
      {!user || user.loading ? (
        <Loading />
      ) : (
        <>
          <div className='label'>Email</div>
          <div className='profile-info'>{user.email}</div>
          <div className='label'>User Id</div>
          <div className='profile-info'>{user.issuer}</div>
        </>
      )}

      <style jsx>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
};

export default Profile;
