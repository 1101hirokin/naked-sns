package main

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dsn := "host=localhost user=hiroki password=pass dbname=appdb port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	/*
		newdata := User{
			ID:             strconv.Itoa(int(time.Now().Unix())),
			CreatedAt:      time.Now().Unix(),
			Name:           "wao",
			HashedPassword: "gnkrenklbaer",
			ScreenID:       "ghireae_" + strconv.Itoa(int(time.Now().Unix())),
			Email:          strconv.Itoa(int(time.Now().Unix())),
		}
		log.Println(newdata)

		if err := db.Table("users").Create(newdata).Error; err != nil {
			panic(err)
		}
	*/

	var data User
	if err := db.Table("users").Select("*").Where("id = ?", "bkblnabea").Find(&data).Error; err != nil {
		panic(err)
	}

	log.Println(data.Name)
}

type User struct {
	ID             string `gorm:"column:id;primaryKey"`
	CreatedAt      int64  `gorm:"column:created_at"`
	Name           string `gorm:"column:name"`
	HashedPassword string `gorm:"column:hashed_password"`
	ScreenID       string `gorm:"column:screen_id"`
	Email          string `gorm:"column:email"`
}
