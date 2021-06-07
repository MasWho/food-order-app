import mealsImage from '../../../assets/img/meals.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton />
            </header>
            <div>
                <img className={styles['main-image']} src={mealsImage}/>
            </div>
        </>
    );
};

export default Header;