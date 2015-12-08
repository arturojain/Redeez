/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author arturojain
 */
public class Song {
    private int songId;
    public Song(int songId){
        this.songId = songId;
    }
    public int getSongId(){
        return this.songId;
    }
}