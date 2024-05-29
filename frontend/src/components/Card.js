import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import {formatDate} from "../utils/formatDate"
import {toast} from "react-hot-toast"
import {DELETE_TRANSCATION} from "../graphql/Mutations/transcation.mutation"
import { useMutation } from "@apollo/client";
import {GET_TRANSCATION , category_staticis} from "../graphql/Queries/transcation.query"



const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-pink-800 to-pink-600",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};

const Card = ({   transaction = {} , authUser }) => {
	let {category = '',
    amount = 0,
    location = '',
    date = '',
    paymentType = '',
    description = ''} = transaction
	const cardClass = categoryColorMap[category] || '';

  // Capitalize the first letter of the description if it exists
  const capitalizedDescription = description
    ? description.charAt(0).toUpperCase() + description.slice(1)
    : '';

  // Capitalize the first letter of the category if it exists
  const capitalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '';

  // Format the date
  const formattedDate = date ? formatDate(date) : '';

   const [deleteTransaction , {loading}] =useMutation(DELETE_TRANSCATION , {
	refetchQueries: [{query: GET_TRANSCATION } , 
					{query: category_staticis}]
   })


  const handleDelete = async() => {
	try{
		await deleteTransaction({variables: {input: transaction._id}})
		toast.success("Transcation deleted successfullty")

	}catch(err) {
		toast.error("Error deleting transaction")
	}
  }

	

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>
					{!loading && <FaTrash className={"cursor-pointer"} onClick={handleDelete} />}
						{loading && <div className='w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin'></div>}
						<Link to={`/transcation/${transaction._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: {amount}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {location}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-black font-bold'>{formattedDate}</p>
					<img
						src={authUser?.profilePicture}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;