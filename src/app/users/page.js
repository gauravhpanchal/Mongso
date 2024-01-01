
const getUsers=async()=>{
        let data = await fetch("/api/products",{ next: { revalidate: 1 } },{cache:"no-store"})
        data=await data.json();
        if(data.success){
            return data.data;
        }
        else{
            return []
        }
}

const UsersPage=async()=>{

            const users =await getUsers();
    return(
        <div className="mt-8">
            <p className="font-semibold text-2xl mb-4">All Users</p>
            <table className="min-w-full border-black">
  <thead className="bg-gray-200">
    <tr>
      <th className="py-2 px-4 border">Firstname</th>
      <th className="py-2 px-4 border">Lastname</th>
      <th className="py-2 px-4 border">Gender</th>
      <th className="py-2 px-4 border">Email</th>
      <th className="py-2 px-4 border">Date of Birth</th>
      <th className="py-2 px-4 border">Phone No</th>
      <th className="py-2 px-4 border">About</th>
    </tr>
  </thead>
  <tbody>
    {users?.map((user) => (
      <tr key={user._id} className="hover:bg-gray-100">
        <td className="py-2 px-4 border">{user.firstname}</td>
        <td className="py-2 px-4 border">{user.lastname}</td>
        <td className="py-2 px-4 border">{user.gender}</td>
        <td className="py-2 px-4 border">{user.email}</td>
        <td className="py-2 px-4 border">{user.dob}</td>
        <td className="py-2 px-4 border">{user.phone}</td>
        <td className="py-2 px-4 border">{user.about}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
    )
}


export default UsersPage;