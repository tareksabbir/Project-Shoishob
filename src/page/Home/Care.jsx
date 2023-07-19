import { Link } from 'react-router-dom';
import gif from '../../assets/images/Hospital patient.gif'

export default function Care() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 px-10 lg:px-28 mt-28'>
            <div>
                <img src={gif} alt="" />
            </div>
            <div className='lg:mt-20 lg:px-8'>
                <h1 className='text-4xl font-bold'>Exceptional health care, on Your Terms</h1>
                <p className=' mt-5'>Exceptional Healthcare is top innovative service provider in healthcare industry. We deliver turn-key process from real estate acquisition and development to staffing, training and operations..Emergency Centers,Urgent Care,Physicians Group,Community Hospitals,maging Centers,Property Holdings..Site Research and Medical PROFORMA Analysis
                    City and State Construction Compliance
                    State Department of Health Regulation Compliance oversight</p>
                <Link to="/" className="inline-block bg-primary hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3 mt-5">Book now</Link>
            </div>
        </div>
  
  )
}
