import Title from '../components/Title'
import { assets } from "../assets/assets";
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1='CONTACT'  text2='US'/>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">54976 Kaimati Street <br /> Store 34, Nairobi</p>
          <p className="text-gray-500">Phone: +254 123 456 789 <br /> Email:Jerseystore@yahoo.com</p>
          <p className="text-gray-500">Monday - Saturday: 9:00 AM - 5:00 PM </p>
          <p className="font-semibold text-xl text-gray-600">Careers at Jerseystore</p>
          <p className="text-gray-500">Learn more about our team and job openings</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>

      </div>

      <NewsLetter />

    </div>

  )
}

export default Contact