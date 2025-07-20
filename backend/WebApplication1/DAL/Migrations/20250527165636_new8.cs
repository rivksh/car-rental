using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class new8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_Users_UsersId",
                table: "Rentings");

            migrationBuilder.AlterColumn<int>(
                name: "UsersId",
                table: "Rentings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_Users_UsersId",
                table: "Rentings",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentings_Users_UsersId",
                table: "Rentings");

            migrationBuilder.AlterColumn<int>(
                name: "UsersId",
                table: "Rentings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentings_Users_UsersId",
                table: "Rentings",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
