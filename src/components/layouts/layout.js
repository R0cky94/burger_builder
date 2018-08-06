import  React from 'react';
import Auxx from '../../hoc/Auxx';
import classes from './Layout.css';


const Layout = ( props ) => (

<Auxx>
    <div> Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.content}>
    {props.children}
    </main>
</Auxx>
);
export default Layout;