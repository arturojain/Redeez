package model;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author arturojain
 */
public class DatosBD {
    public void addUser(String user, String password) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        Consultas c = new Consultas();
        String query = "INSERT INTO User (User, Password) VALUES ('"+user+"',"
                + "'"+password+"')";
        c.altaBajaCambio(query);
    }
    
    public boolean setSession(String user, String password) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        boolean flag = false;
        Consultas c = new Consultas();
        String query = "SELECT 1 FROM User WHERE User = '"+user+"' "
                + "AND Password = '"+password+"'";
        java.sql.ResultSet rs1 = c.consultar(query);
        while (rs1.next()) {
            flag = true;
        }
        c.con.close();
        return flag;
    }
    
    public void setPublicSong(int songId, int userId) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        Consultas c = new Consultas();
        String query = "INSERT INTO PublicPlaylist (SongID, UserID, Likes) "
                + "VALUES ("+songId+","+userId+", 0)";
        c.altaBajaCambio(query);
    }
    
    public void setPrivateSong(int songId, int userId) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        Consultas c = new Consultas();
        String query = "INSERT INTO PrivatePlaylist (SongID, UserID) "
                + "VALUES ("+songId+","+userId+")";
        c.altaBajaCambio(query);
    }
    
    public void like(int songId, int userId) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        Consultas c = new Consultas();
        String query = "INSERT INTO rezeed.Like (SongID, UserID) "
                + "VALUES ("+songId+","+userId+")";
        try {
            c.altaBajaCambio(query);
        } catch (Exception e){
            
        }
        
    }
    
    public int getUserId(String user) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        int id = 0;
        Consultas c = new Consultas();
        String query = "SELECT UserID From User WHERE User = '"+user+"'";
        java.sql.ResultSet rs1 = c.consultar(query);
        while (rs1.next()) {
            id = rs1.getInt("UserID");
        }
        c.con.close();
        return id;
    }
    
    public ArrayList<Song> getPublicPlaylist() throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        int id = 0;
        Consultas c = new Consultas();
        ArrayList<Song> array = new ArrayList<Song>();
        String query = "SELECT SongID From PublicPlaylist ORDER BY Likes DESC";
        java.sql.ResultSet rs1 = c.consultar(query);
        while (rs1.next()) {
            id = rs1.getInt("SongID");
            Song s = new Song(id);
            array.add(s);
        }
        c.con.close();
        return array;
    }
    
    public ArrayList<Song> getPrivatePlaylist(int userId) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        int id = 0;
        Consultas c = new Consultas();
        ArrayList<Song> array = new ArrayList<Song>();
        String query = "SELECT SongID From PrivatePlaylist WHERE UserID = " + userId;
        java.sql.ResultSet rs1 = c.consultar(query);
        while (rs1.next()) {
            id = rs1.getInt("SongID");
            Song s = new Song(id);
            array.add(s);
        }
        c.con.close();
        return array;
    }
    
    public int getLikes(int songId) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException{
        int likes = 0;
        Consultas c = new Consultas();
        String query = "SELECT COUNT(*) AS NoLikes From rezeed.Like WHERE SongID = " + songId;
        java.sql.ResultSet rs1 = c.consultar(query);
        while (rs1.next()) {
            likes = rs1.getInt("NoLikes");
        }
        c.con.close();
        return likes;
    }
}
