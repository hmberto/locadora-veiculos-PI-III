package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;

public class LoginUserFromDB {
	public static String NAME = LoginUserFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(LoginUserFromDB.class.getName());
	
	public Map<Integer, String> LoginUser(String login, String pass) {
		LOG.entering(NAME, "LoginUser");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_USER");
		String sql2 = EnvVariables.getEnvVariable("DATABASE_INSERT_USER_SESSION");
		
		Map<Integer, String> user = new HashMap<Integer, String>();
		Map<Integer, String> session = new HashMap<Integer, String>();
		
		String alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			statement.setString(1, login);
			statement.setString(2, pass);
			
			ResultSet f = statement.executeQuery();
			
			while(f.next()) {
				for(int i = 1; i < 23; i++) {
					user.put(i, f.getString(i));
				}
				
				LOG.log(Level.INFO, "Data geted from the database. Login: " + login);
			}
			
			String userSession = "";
			if(user.get(2) == null || user.get(2).equals("null")) {}
			else {
				for(int i = 0; i < 50; i++) {
					int myindex = (int)(alphaNumeric.length() * Math.random());
					
					userSession = userSession + alphaNumeric.charAt(myindex);
				}
			}
			
			PreparedStatement statement2 = Database.connect().prepareStatement(sql2);
			statement2.setString(1, userSession);
			statement2.setString(2, login);
			
			statement2.execute();
			
			session.put(1, userSession);
						
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "LoginUser");
		return session;
	}
}