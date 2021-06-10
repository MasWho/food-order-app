import mealsImage from '../../../assets/img/meals.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = ({onShowCart}) => {
    return (
        <>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={onShowCart}/>
            </header>
            <div>
                <img className={styles['main-image']} src={mealsImage} alt="/" />
            </div>
        </>
    );
};

export default Header;