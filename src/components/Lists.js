import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function Lists({ content }) {
  return (
    <div className="list">
      <List>
        <ListItem>
          <ListItemText primary={content} />
        </ListItem>
      </List>
    </div>
  );
}
