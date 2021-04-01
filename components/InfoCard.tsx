import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  }
});

export default function InfoCard({ title, content, href }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ cursor: 'pointer' }}>
      <Link href={href}>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography className={classes.title} color="textSecondary" style={{ textAlign: 'center' }} gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" component="p" style={{ textAlign: 'center' }}>
              {content}
            </Typography>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}