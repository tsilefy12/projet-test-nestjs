import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, FormLabel } from "@mui/material";
import { deleteArticle, getArticles } from "../../../redux/features/article/article";

const TableArticle = () => {
    const dispatch = useDispatch();
    const { articles } = useSelector((state) => state.articles);

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);
  const handleDeleteArticle = (id) => {
    dispatch(deleteArticle(id));
  };
    return (
          <TableContainer component={Paper} sx={{ margin: 4 }}>
            <FormLabel component="legend" sx={{padding: 2}}>Liste des articles</FormLabel>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Article</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Utilisateur</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articles && articles.length > 0 ? (
                        articles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell>{article.articleName}</TableCell>
                                <TableCell>{article.quantity}</TableCell>
                                <TableCell>{article.user_id}</TableCell>
                                <TableCell>
                                <Button variant="contained" color="primary" style={{ marginRight: "8px" }} component="a" href={`/article/edit/${article.id}`}>
                                        Modifier
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteArticle(article.id)}>
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                Aucun article disponible
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableArticle;
