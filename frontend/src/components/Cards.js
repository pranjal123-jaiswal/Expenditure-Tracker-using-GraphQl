import Card from "./Card";
import { useQuery } from "@apollo/client";
import {GET_TRANSCATION} from "../graphql/Queries/transcation.query"
import {GET_AUTHENTICATE_USER} from "../graphql/Queries/user.query"
// import {GET_TRANSCATION} from "../graphql/Queries/transcation.query"/

const Cards = () => {
	const {data , loading , error} = useQuery(GET_TRANSCATION )
	const {data: authUser} = useQuery(GET_AUTHENTICATE_USER)
	if(error) return <p>Error: {error.message}</p>
	if(loading) return <p> Loading...</p>

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && data.transactions.map(transaction => (
					<Card key={transaction._id} transaction={transaction}
					authUser= {authUser.authUser}
					/>
				))}
			</div>
			{!loading && data?.user?.transactions.length === 0 && (
				<p className='text-2xl font-bold text-center w-full'>No transaction history found.</p>
			)}
		</div>
	);
};
export default Cards;