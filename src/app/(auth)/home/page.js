import style from './home.module.css'

const Home = () => {
    return (
        <div className={style.homepage}>
            <h1 className={style.homepage__title}>
                Local Project Management
            </h1>
            <p className={style.homepage__content}>
                This is my personal project called "Local Project Management" based on a project that I used to join at an old company. This project is still being developed continously so that I can make a better profile for my CV and improve my technical skills.
            </p>
            <p className={style.homepage__author}>
                Author: Tran Quoc Tung - Tommy
            </p>
        </div>
    )
}

export default Home