package com.dronecontrol;

import java.util.ArrayList;
import java.util.List;


import org.springframework.stereotype.Repository;

@Repository
public class DronecontrolRepository{
    private long idCounter =  0;
    

    private List<Items> items = new ArrayList<>();
    public List<Items> fetchAllItems(){
        if(items.size() == 0){
            Items item = new Items();
            item.setId(idCounter++);
            

        }
        return items;

    }
}