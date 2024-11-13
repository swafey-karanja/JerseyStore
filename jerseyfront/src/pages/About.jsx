import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetter from '../components/NewsLetter';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1='ABOUT' text2='US'/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>At EverStyle Clothline Co., we believe fashion is more than clothing—it&apos;s an expression of identity and comfort. Specializing in timeless and contemporary designs, we craft premium garments for men, women, and children, blending elegance with everyday practicality. </p>
          <p>Our commitment to quality ensures each piece is made from sustainable, durable fabrics that feel luxurious and support eco-friendly practices. With a focus on impeccable craftsmanship and trendsetting styles, EverStyle provides everything from casual essentials to formal wear. </p>
          <b className="text-gray-800">Our Mission</b>
          <p>At EverStyle Clothline Co., our mission is to empower individuals through fashion that prioritizes quality, sustainability, and style. We strive to create garments that enhance confidence, promote self-expression, and respect the planet. By combining innovative design with ethical practices, we aim to redefine modern fashion for a better, conscious future.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1='WHY' text2='EVERYSTYLE'/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At EverStyle Clothline Co., quality is our promise. We ensure each garment undergoes rigorous inspection, using the finest materials and skilled craftsmanship to deliver durable, comfortable, and stylish clothing that exceeds expectations.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'> EverStyle Clothline Co. prioritizes convenience by offering an intuitive online platform for effortless browsing and shopping.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>At EverStyle Clothline Co., exceptional customer service is at our core. Our dedicated team is here to assist and respond to your needs.</p>
        </div>

      </div>

      <NewsLetter />

    </div>
  )
}

export default About