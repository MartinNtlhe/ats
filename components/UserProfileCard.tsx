export default function UserProfileCard({ user }) {
  if (user) {
    return (
      <div className="p-4 mx-auto shadow-md border space-y-1 max-w-md">
        <h1 className="text-lg text-normal">Name: {user.GSI1SK}</h1>
        <h4>Email: {user.user_email}</h4>
        <h4>ID: {user.user_id}</h4>
        <h4>ORG: {user.org_id}</h4>
        <h4>Created: {user.created_at}</h4>
      </div>
    );
  }

  return null;
}
