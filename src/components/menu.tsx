

// function Menu() {
//     return (
//         <div className="Menu">
//             <p>Home</p>
//             <p>About</p>
//         </div>
//     );
// }

// export default Menu;
import { Link } from 'react-router-dom';
import logo from './logo192.png'
import './menu.css';

function Menu(props: any) {
    const { currentPage } = props;

    const menuItems = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Daily Dose', link: '/daily-dose' },
        { name: 'Contact Us', link: '/contact-us' },
    ];

    return (
        <nav className="menu">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo" style={{ "width": "50px" }} />
                </Link>
            </div>
            <div className="menu-items">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.link}
                        className={currentPage === item.name ? 'active' : ''}
                    >
                        <div className="menu-item">
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Menu;