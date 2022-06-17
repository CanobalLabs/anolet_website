export default function AnoletNavbarEntry({ name, icon, action }) {
    return (
        <ListItem button key={name} component="a" onClick={action(e)}>
          <ListItemIcon>
            { icon }
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
    );
}