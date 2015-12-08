/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author arturojain
 */
public class Consultas {

    Conexion c = new Conexion();
    Connection con;

    public void altaBajaCambio(String query) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        try (Connection con = c.getConnection()) {
            if (con == null) {
                System.out.println("No hay conexion");
            } else {
                Statement st = con.createStatement();
                st.executeUpdate(query);
            }
            con.close();
        }
    }

    public ResultSet consultar(String query) throws SQLException, IOException, FileNotFoundException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        con = c.getConnection();
        ResultSet rs = null;
        if (con == null) {
            System.out.println("No hay conexion");
        } else {
            Statement st = con.createStatement();
            rs = st.executeQuery(query);
        }
        return rs;
    }

//    public static void main(String[] args) {
//        DatosBD bd = new DatosBD();
//        try {
//            bd.getPublicPlaylist();
//        } catch (SQLException ex) {
//            Logger.getLogger(Consultas.class.getName()).log(Level.SEVERE, null, ex);
//        } catch (IOException ex) {
//            Logger.getLogger(Consultas.class.getName()).log(Level.SEVERE, null, ex);
//        } catch (ClassNotFoundException ex) {
//            Logger.getLogger(Consultas.class.getName()).log(Level.SEVERE, null, ex);
//        } catch (InstantiationException ex) {
//            Logger.getLogger(Consultas.class.getName()).log(Level.SEVERE, null, ex);
//        } catch (IllegalAccessException ex) {
//            Logger.getLogger(Consultas.class.getName()).log(Level.SEVERE, null, ex);
//        }
//    }
}
