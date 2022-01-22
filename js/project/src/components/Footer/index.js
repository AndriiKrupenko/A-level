import { Logo } from '../../App';
import { AppBar, Box, Toolbar, IconButton, Badge, Tooltip, Typography } from '@mui/material'

const Footer = () =>
    <Box sx={{  bgcolor: '#290302', pt: '2rem', pb: '2rem', textAlign: 'center'}}>
        {/* <Logo />  */}
        <Typography sx={{color: '#fff'}}><i>Developed by:&nbsp;&nbsp;AndriiKrupenko (Frontend)</i></Typography>
    </Box>

export default Footer;